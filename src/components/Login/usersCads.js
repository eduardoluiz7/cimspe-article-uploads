import React, { Component } from 'react';
import firebase from '../../firebase/firebase';


class Cadastro extends Component {


     users = [

        {email: 'livialocio97@gmail.com', senha: '38741239', nome: 'Lívia'},
         {email: 'vitoriacarreiro3@gmail.com', senha: '30140207', nome: 'Vitória'},
         {email: 'leilanecamila_@hotmail.com', senha: 'lcflf1991', nome:'Leilane' },
         {email: 'rodrigokpereira80@yahoo.com.br', senha:'rodrigo40' , nome:'RODRIGO' },

        {email: 'cmpjuniorpsicologia@gmail.com', senha:'cimspe2019', nome: 'CELESTINO'},
        {email: 'nadjaferraz85@hotmail.com', senha:'cimspe2019' , nome:'NADJA' },
        {email:'yllanacdme@gmail.com' , senha: 'anally98', nome: 'YLLANA'},
        {email: 'souzaamarielee@gmail.com', senha:'porcelanato', nome: 'Mariele'},
        {email:'geooh.bc@gmail.com' , senha:'bio-medicina1', nome: 'Geovana'},
        {email: 'mateusnunesvideira@gmail.com', senha:'Biomed*2018', nome: 'Mateus'},
        {email: 'ju.cunha.pc@gmail.com', senha:'cunha18022608', nome: 'Júlia'},
        {email: 'lavynialoure@gmail.com', senha:'caixadesom15!', nome: 'Lavynia'},
        {email: 'pedro_cesar.pc@hotmail.com', senha:'34332185', nome: 'Pedro'},
        
        {email:  'renatadias195@gmail.com' , senha:'biomedicinaufg' , nome:'Renata' },

        {email:'carolinasr4297@gmail.com' , senha:'carolinasr4297' , nome: 'Carolina'},
     {email:'kim.mgouveia@gmail.com' , senha:'961028Kim$' , nome:'Kimberly' },
     {email: 'thatyanne_rodrigues@hotmail.com', senha: 'moraes0709', nome:'THATYANNE' },
     {email: 'maimfaria@gmail.com', senha: 'maira123', nome: 'Maia­ra'},
     {email: 'carol.beatriz.araujo@gmail.com', senha: 'Ec4rai?!', nome: 'Caroline'},
     {email: "alicebarros.enf@gmail.com", senha: "eumeamo+", nome: "Alice"},
        {email: "veronica.alves@esenfar.ufal.br", senha: "veraufal32", nome: "Verônica"},
        {email: "joegefelix@gmail.com", senha: "???lalabb", nome: "Alana"},
         {email: "mari_mariane_lais@hotmail.com", senha: "marilais97080450", nome: "Mariane"},
{email:"rosanamaria1994@gmail.com" , senha: "WeZQ4Fn2KNXuBRa", nome:"Rosana" },
{email: "suzylemos93@gmail.com", senha: "115133", nome: "Maria"},
{email: "milena_pereirasilva@hotmail.com", senha: "flamengo22", nome: "Milena" },
{email: "tatienfe@yahoo.com.br", senha:  "tatiana45", nome: "TATIANA"},
{email: "adna-maria2008@hotmail.com", senha:"jose10" , nome:"Adna" },
{email: "isa_belecaroline@hotmail.com", senha:  "isabele123", nome: "Isabele"},
{email: "ortenciakelly@hotmail.com", senha:"ok1507bf" , nome: "Ortência"}, 
{email:  "waleskkaramos@gmail.com", senha:"96817505wawa147leska" , nome: "Waleska"},
{email: "claudias.cavalcantes@gmail.com", senha: "Aninha97", nome: "Ana"}, 
{email: "luana.alvesfreittas@gmail.com", senha:"b77med77" , nome:"Luana" },  
{email: "kleber.limaa@outlook.com", senha: "Farmacia03", nome: "Cléber"}, 
{email: "ingridlins81@gmail.com", senha: "jujubaverde88", nome: "INGRID"},  
{email: "Nsousa.expressaocorporal@gmail.com", senha: "Naty21254" , nome: "Nataly"}, 
{email: "camilla.aguiar@outlook.com.br", senha:"223344" , nome: "Camilla"},
{email: "hericasouza277@gmail.com", senha:"balbina2016" , nome: "Hérica"},
{email: "csbalbyno@hotmail.com", senha: "menino6348", nome: "CARLA"},
{email: "pathycardoso28@hotmail.com", senha: "28081982", nome: "Patricia"},
{email: "mayalimaa20@outlook.com", senha: "08021995", nome: "Mayara"},
{email: "Victoriaemmanuely2@gmail.com" , senha: "VICTORIA.V3", nome:"Victória"},
{email: "will.barros@hotmail.com", senha: "w35211221" , nome: "William"},
{email: "mateus.filizola@hotmail.com", senha:"99542325" , nome: "Mateus"},
{email: "wirleym@hotmail.com", senha:"Eva1996!" , nome:"WIRLEY" }]


    constructor(props){
        super(props)
            this.register(this.users[0])
           
    }
    async register(item){
        try{
            await firebase.register(item.email, item.senha )
            firebase.updateName(item.nome).then(()=>{
                console.log(firebase.getCurrentUsername())
            })
        }catch(e){
            console.log(e)
        }
    }
    render() { 
        return ( 
            <div>
                ok
            </div>
         );
    }
}

export default Cadastro;
