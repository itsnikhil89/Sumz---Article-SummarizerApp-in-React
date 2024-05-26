import React from 'react'

import { useEffect,useState } from 'react'

import { useLazyGetSummaryQuery } from '../../Services/article';

import {copy,linkIcon,loader,tick} from '../../assets';
const Demo = () => {

    const[article,setArticle]=useState({
        url:'',
        summary:'',
    });

    const[allArticles,setAllArticles]=useState([]);

    useEffect(()=>{
        const articlesFromLocalStorage=JSON.parse(localStorage.getItem('articles'))

        if(articlesFromLocalStorage){
          setAllArticles(articlesFromLocalStorage);
        }
    },[]);

    const[getSummary,{error, isFetching}]=useLazyGetSummaryQuery();

     const handleSubmit= async(e)=>{
      e.preventDefault();
        const {data} =await getSummary({articleUrl:article.url});

        if(data?.summary){
          const newArticle= {...article, summary:data.summary};
          
          //storing new article in all article for local storage
          const updatedAllArticles=[newArticle,...allArticles];

          setArticle(newArticle);
          setAllArticles(updatedAllArticles)
         
          localStorage.setItem('articles',JSON.stringify(updatedAllArticles));
        }

        
     };
 
     function handleInput(event){
        setArticle((currenturl)=>{
            return{...currenturl,url:event.target.value};
        })
     }



  return (

    <section className='mt-16 w-full max-w-xl'>
     {/*search*/}
     <div className='flex flex-col w-full gap-2'>
          <form className='relative flex justify-center items-center' onSubmit={handleSubmit}>
 
               <img src={linkIcon} alt='link_icon' className='absolute left-0 my-2 ml-3 w-5' ></img>

               <input type='url' placeholder='Enter a URL ' value={article.url} onChange={handleInput} required className='url_input peer'></input>

               
               <button type='submit' className='submit_btn peer-focus:border-gray-700  peer-focus:text-gray-700' >✅</button>

          </form>

          {/* {browse url history } */}
          <div className='flex flex-col gap-1 max-h-60 overflow-y-auto'>
             {allArticles.map((item,index)=>(
              <div key={`link-${index}`}
                onClick={()=>setArticle(item)} className='link_card'>

                <div className='copy_btn'>
                    <img src={copy} alt="copy_icon" className='w-[40%] h-[40%] object-contain'/>
                </div>
                 <p className='flex-1 font-satoshi text-blue-700 font-medium text-sm truncate'>{item.url}</p>
              </div>
             ))}
          </div>

     </div>
           {/* {Display Results} */}
           <div className='my-10 max-w-full flex justify-center items-center'>
           {isFetching ? (
            <img src={loader} alt="loading" className='w-20 h-20 object-contain'/>
           ): error?(<p className='font-inter font-bold text-black text-center'>Well ,that wasn't supposed to happen....
           <br/>
           <span className='font-satoshi font-normal text-gray-700'>
            {error?.data?.error}
           </span>
           </p>
           ) : (
              article.summary &&(
                <div className='flex flex-col gap-3'>
                    <h2 className='text-2xl'>Article <span className='blue_gradient'>Summary</span></h2>
                    <div className='summary_box'>
                         <p className='font-inter font-medium text-sm text-gray-700'>{article.summary}</p>
                    </div>

                </div>
              )
           )}

           </div>
    </section>
   
     
  )
}

export default Demo