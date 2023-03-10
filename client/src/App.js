import './App.css';
import axios from 'axios';
import { saveAs } from 'file-saver';
import { Component } from 'react';


// function App() {
//   const [ name, setName ] = useState('');
//   const [ receiptId, setReceiptId ] = useState(0);
//   const [ price1, setPrice1 ] = useState(0);
//   const [ price2, setPrice2 ] = useState(0);
  
//   const handleChange = ({target: { value, name}}) => {}
//   return (
//     <div className="App">
//       <input type="text" placeholder="Name" name="name" onChange={handleChange} />
//       <input type="number" placeholder="Receipt Id" name="receiptId" onChange={handleChange} />
//       <input type="text" placeholder="Price 1" name="price1" onChange={handleChange} />
//       <input type="text" placeholder="Price 2" name="price2" onChange={handleChange} />
//       <button onClick={createAndDownloadPdf}>Download PDF</button>
//     </div>
//   );
// }

class App extends Component {
  state = {
    name:'',
    receiptId:0,
    price1:0,
    price2:0
  }
  handleChange = ({ target: {value, name }}) => this.setState({ [name] : value})

  createAndDownloadPdf = () => {
    axios.post('/create-pdf', this.state)
    .then(() => axios.get('fetch-pdf', { responseType: 'blob' }))
    .then((res) => {
      const pdfBlob = new Blob([res.data], { type: 'application/pdf' })

      saveAs(pdfBlob, 'newPdf.pdf');
    })

  }
  render(){
    return(
      <div className="App">
      <input type="text" placeholder="Name" name="name" onChange={this.handleChange} />
      <input type="number" placeholder="Receipt Id" name="receiptId" onChange={this.handleChange} />
     <input type="number" placeholder="Price 1" name="price1" onChange={this.handleChange} />
     <input type="number" placeholder="Price 2" name="price2" onChange={this.handleChange} />
      <button onClick={this.createAndDownloadPdf}>Download PDF</button>
    </div>
    );
  }
}
export default App;
