import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import "./new.css";
import firebase from '../../firebase';

class New extends Component{

  constructor(props){
    super(props);
    this.state = {
      titulo: '',
      image: null,
      url: '',
      descricao: '',
      alert: ''
    };

    this.cadastrar = this.cadastrar.bind(this);
    this.handleFile = this.handleFile.bind(this);
    this.handleUpload = this.handleUpload.bind(this);

  }

  componentDidMount(){
    if(!firebase.getCurrent()){
      this.props.history.replace('/');
      return null;
    }
      
  }


  cadastrar = async(e)=>{
    e.preventDefault();

    if(this.state.titulo !== '' && this.state.image !== '' && this.state.descricao !== ''){
      let posts = firebase.app.ref('posts');
      let chave = posts.push().key;

      await posts.child(chave).set({
        titulo: this.state.titulo,
        image: this.state.image,
        descricao: this.state.descricao,
        autor: localStorage.nome
      });

      this.props.history.push('/dashboard');


    }else{
      this.setState({alert: 'Preencha todos os campos!'});

    }

  }

  handleFile=async(e)=>{

    if(e.target.files[0]){

    const image = e.target.files[0];

    if(image.type === 'image/jpeg' || image.type === 'image/png'){
      await this.setState({image: image});
      this.handleUpload();
    }else{
      alert('Envie uma imagem PNG ou JPEG"');
      this.setState({image: null});
      return null;

    }


    }

  }

  handleUpload = async () =>{
    const { image } = this.state;
    const currentUid = firebase.getCurrentUid();
    const uploadTask = firebase.storage.ref(`images/${currentUid}/${image.name}`)
    .put(image);

   /* await uploadTask.on('state_changed', 
    (snapshot)=>{
      //progress
    },
    (error)=>{
      //error
      console.log('Error imagem:' + error);
    },
    () =>{
      // sucesso!
    }
    ) */
  }



  render(){
    return(
      <div>
      <header id="new">
        <Link to="/dashboard">Voltar</Link>
      </header>
      <form onSubmit={this.cadastrar} id="new-post">

      <span>{this.state.alert}</span>

      <input type="file" onChange={this.handleFile}/> <br />

        <label>Título:</label> <br />
        <input type="text" placeholder="Nome do post" value={this.state.titulo} onChange={(e)=> this.setState({titulo: e.target.value})} autoFocus/> <br />

       
       

        <label>Descrição:</label> <br />
        <textarea type="text" placeholder="Alguma descrição" value={this.state.descricao} onChange={(e)=> this.setState({descricao: e.target.value})}/> <br />

        <button type="submit">Cadastrar</button>
      </form>
      </div>
    );
  }
}


export default withRouter(New);