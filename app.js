
let limit = 10, page = 1

const fetchData = async (callback) => {
  
  try{
    const res = await axios.get('https://jsonplaceholder.typicode.com/posts')
    const posts = []
    
    for(let i = (((page * limit) - limit) ); i < limit * page; i++){
      if(res.data[i]){
        posts.push(res.data[i])
      }
    }
    callback(posts)
  }catch(error){ console.log('error::', error)}
}

const createContentList = (data, target) => {
  data.forEach(item => {
    const newItem = document.createElement('li')
    newItem.textContent = `${item.id}. ${item.title}`
    newItem.classList.add('list-item')
    target.appendChild(newItem)
  });
}

window.addEventListener("DOMContentLoaded", async function(){
  const container = document.getElementById('list_body')
  await fetchData((data) => createContentList(data, container))
})

async function onScroll(event){ 
  if(event.scrollTop === (event.scrollHeight - event.clientHeight)){
    page = page + 1
    const container = document.getElementById('list_body')
    await fetchData((data) => createContentList(data, container))

  }
}






