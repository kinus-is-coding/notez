import { useEffect, useState } from "react"
import api from "../api"
import { ACCESS_TOKEN } from "../constants";
import Note from "../components/Note"
import "../styles/Home.css"
function Home(){
        const [notes,setnotes]= useState([]);
        const [content,setcontent]=useState("");
        const [title,settitle]=useState("");
        useEffect(()=>{
                getnote();
        },[])
        const getnote =()=>{
                api
                        .get("/api/notes/")
                        .then((res)=>res.data)
                        .then((data)=>{setnotes(data),console.log(data)})
                        .catch((error)=>alert(error));
        };
        const deletenote =(id)=>{
                api
                        .delete(`/api/notes/delete/${id}/`)
                        .then((res)=>{
                                if (res.status===204) alert("Note deleted")
                                else alert("failed to delete note")
                                getnote()
                        })
                        .catch((error)=>alert(error))
                        
        };
        const createnote=(e)=>{
                e.preventDefault()
                api.post("api/notes/",{content,title})
                        .then((res)=>{
                                if(res.status===201) alert('note created')
                                else console.log(res.sta)
                                getnote()

                        })
                        .catch((error)=>alert(error))
        };
        return <div>
                        <div>
                                <h2>Notes</h2>
                                {notes.map((note)=>(
                                        <Note note={note} onDelete={deletenote} key={note.id}/>
                                        ))}
                        </div>
                        <h2>Create a note</h2>
                        <form onSubmit={createnote}>
                                <label htmlFor="title">Title:</label>
                                <br />
                                <input 
                                        type="text" 
                                        id="title" 
                                        name="title" 
                                        required 
                                        onChange={(e)=>settitle(e.target.value)} 
                                        value={title}/>

                                <label htmlFor="content">Content:</label>
                                <br />
                                <textarea 
                                        name="content" 
                                        id="content"
                                        required
                                        value={content}
                                        onChange={(e)=>setcontent(e.target.value)}>
                                
                                </textarea>
                                <br />
                                <input 
                                        type="submit" 
                                        value="Submit"/>
                        </form>
        </div>
}
export default Home     