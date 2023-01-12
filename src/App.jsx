import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'

function App() {
  const [imageDesc, setImageDesc] = useState('');
  const [displayImage, setDisplayImage] = useState()
  const [showspinner, setSpinner] = useState(false)


  const handleChange = (e) => {

    setImageDesc((prev) => ({ ...prev, [e.target.id]: e.target.value }))
  };

  const handleReset = (e)=>{
    setDisplayImage("")
    // setImageDesc("")
  }

  
  const handleSubmit = async (e)=>{
    e.preventDefault()

    if(!imageDesc){
      alert("Input field cannot be empty")
      return
    }

    try {
      
      setSpinner(true)
      const response = await fetch('https://real-jade-snail-veil.cyclic.app/generateImage', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            prompt: imageDesc.prompt,
            size : imageDesc.size
        })
    })
      //  console.log(response);    
       const data = await response.json()   

       setDisplayImage(data.data)

       setSpinner(false)

          // setImageDesc("")
    
        } catch (error) {
          alert(error)
          console.log(error);
        }
    
    
  }

  return (
    <div className='container-fluid'>
      <div className='row mb-4 text-center py-5' style={{background:'#4d4dff'}}>
        <h1 style={{color:'#ffffff'}}>Describe An Image</h1>
      </div>

    {/* image form */}
      <div className='row '>
        <form className='col-12 col-lg-6 col-md-8 mx-auto'>
        <div className="form-control mb-3">
            <input className='form-control' value={imageDesc?.prompt} autoComplete="off" type="text" id="prompt" 
            onChange={handleChange} placeholder="Enter Text" />
          </div>
          {/* Size */}
          <div className="form-control">
            <select className='form-control' value={imageDesc?.size} id="size" onChange={handleChange}>
              <option >Select Size</option>
              <option value="small">Small</option>
              <option value="medium" >Medium</option>
              <option value="large">Large</option>
            </select>
          </div>

          <button type="submit" style={{background:'#6666ff',outline:'none',color:'#fff'}} onClick={handleSubmit}  className={`btn  my-4 ${showspinner && 'disabled'}`}>Generate</button>
          {displayImage &&
                    <button type="submit" onClick={handleReset}  className="btn btn-dark my-4 ms-5 ">Reset</button>
          }
        </form>
      </div>

      <div className="row image mb-5">
        <div className="image-container">
          {/* <h2 className="msg"></h2> */}
          <img src={displayImage} alt="" id="image" className='img-fluid mx-auto d-block' />
        </div>
      </div>

      {showspinner &&
      <div className="d-flex justify-content-center ">
      <div className={`spinner-grow text-primary`} role="status">
      <span className="visually-hidden">Loading...</span>
    </div>
    </div>
}
    </div>
  )
}

export default App
