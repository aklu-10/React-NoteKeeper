import { useEffect, useRef, useState } from 'react';
import './Note.css';

function Header() {

    let [CrNt,ToggleNt]=useState(false);
    let [title,updateTitle]=useState('');
    let [content,updateContent]=useState('');
    let [added,toggleadded]=useState(false);
    let [notes,updateNotes]=useState([]);
    let [searchContext,updateSearch]=useState('');
    let pKey=1;
    
    let prevNotes=useRef();

    function createNote(e)
    {
        CrNt?ToggleNt(false):ToggleNt(true);

        if(e.target.id)
        {
            updateNotes((note)=>[...note,{title:title,content:content}])
            updateTitle('');
            updateContent('');
            toggleadded(true);
        }
    }

    useEffect(()=>
    {   
        setTimeout(()=>
        {
            toggleadded(false);
        },1000)
        

        if(toggleadded){
            prevNotes.current=[...notes];
        }

    },[added])


    function SearchValue(e)
    {
        searchContext=(e.target.value).trim();
        updateSearch(searchContext);
        filter((searchContext.toLowerCase()));
    }

    function filter(searchTerm)
    {
            let terms=(notes.filter(function(text)
            {
                if(searchTerm!=='')
                    return (((text.content).toLowerCase()).includes(searchTerm));
            }));
            
            if(terms.length)
            {
                updateNotes([...terms]);
            }else
            {
                updateNotes([...prevNotes.current]);

            }
        
            
        
    }

    return ( 
        
        <>

        <div className={CrNt?"noteCreation":"noteCreationhide"}>

            <div className="noteData">

                <input type="text" placeholder='Title' onChange={(e)=> updateTitle(e.target.value)} value={title} required/>

                <textarea cols="30" rows="10" placeholder='Content' onChange={(e)=> updateContent(e.target.value)}  value={content} ></textarea>
                <button id="create" onClick={createNote} >Create</button>

            </div>


        </div>

        <div  className={added?"added":'hideadded'}>Added</div>
        
        <header>

            <a className="logo">NoteKeeper</a>

            <input type="search" id="search" placeholder="Search" onChange={SearchValue} value={searchContext} />

            <div className="addNote" onClick={createNote} >+</div>

        </header>

        { (notes.length)?"":<p className='empty'>Nothing here, try to add notes by pressing '+' button.</p> }

        <div className="allNotes">


            {
                notes.map((data)=>
                    (
                        
                        <div key={pKey} className="note" >
                            <h3 key={pKey+=1} >{data.title}</h3>
                            <p key={pKey+=2} >{data.content}</p>
                        </div>
                        
                    ))     
                
                }


        </div>

        </>

     );
}

export default Header;