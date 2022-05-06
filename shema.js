const {
    GraphQLObjectType,
    GraphQLSchema,
    GraphQLString,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull

}=require('graphql');

const axios=require('axios');
/*
var personeller=[
    {id:'1',isim:'ali',yas:30,email:'ali@gmail.com'},
    {id:'2',isim:'alis',yas:31,email:'alis@gmail.com'},
    {id:'3',isim:'ald',yas:33,email:'alid@gmail.com'},
    {id:'4',isim:'alik',yas:34,email:'alik@gmail.com'},
]*/

const PersonelType=new  GraphQLObjectType({
    name:'Personel',
    fields:()=>({
        id:{type:GraphQLString},
        isim:{type:GraphQLString},
        email:{type:GraphQLString},
        yas:{type:GraphQLInt},
    })
});

const RootQuery=new GraphQLObjectType({
    name:'RootQuery',
    fields:{
        personel:{
            type:PersonelType,
            args:{id:{type:GraphQLString}},
            resolve(parent,args){
                //veriye erişim
                /*for(let i=0;i<personeller.length;i++){
                    if(personeller[i].id===args.id){
                        return personeller[i];
                    }
                }*/
                return axios.get('http://localhost:3000/personeller/'+args.id).
                then(res=>res.data);
            }
        },
        personeller:{
            type: new GraphQLList(PersonelType),
            resolve(parent,args){
                return axios.get('http://localhost:3000/personeller/').
                then(res=>res.data);
            }
        }
    }
})
const mutation=new GraphQLObjectType({
    name:'Mutation',
    fields:{
        personelEkle:{
            type:PersonelType,
            args:{
                isim:{type:new GraphQLNonNull(GraphQLString)},
                email:{type:new GraphQLNonNull(GraphQLString)},
                yas:{type:new GraphQLNonNull(GraphQLInt)},
            },
            resolve(parent,args){
                return axios.post('http://localhost:3000/personeller',{
                    isim:args.isim,
                    email:args.email,
                    yas:args.yas
                }).then(res=>res.data)
            }
        },
        personelSil:{
            type:PersonelType,
            args:{
                id:{type:new GraphQLNonNull(GraphQLString)}
            },
            resolve(parent,args){
                return axios.delete('http://localhost:3000/personeller/'+args.id).then(res=>res.data)
            }
        },
        personelGuncelle:{
            type:PersonelType,
            args:{
                id:{type:new GraphQLNonNull(GraphQLString)},
                isim:{type:GraphQLString},
                email:{type:GraphQLString},
                yas:{type:GraphQLInt}
            },
            resolve(_,args){
                return axios.patch('http://localhost:3000/personeller/'+args.id,args).then(res=>res.data)
            }
        }
    }
})
module.exports=new GraphQLSchema({
    query:RootQuery,
    mutation:mutation
})