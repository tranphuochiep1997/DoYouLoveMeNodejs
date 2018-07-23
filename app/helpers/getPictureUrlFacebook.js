module.exports=  getPictureFacebook = (facebookId) =>{
  return `https://graph.facebook.com/${facebookId}/picture?width=500&height=500`
}