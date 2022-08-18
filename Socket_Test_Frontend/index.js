const socketEvents = {
  updateSocketID: 'updateSocketID',
  addProduct: 'addProduct',
  addComment: 'addComment',
  addReply: 'addReply',
  updateComment: 'updateComment'
}

const clintIo = io('http://localhost:3000')

clintIo.emit(socketEvents.updateSocketID, '62c9bf4f3919b6a16dc1fb65')

clintIo.on(socketEvents.addProduct, data => {
  console.log('socketEvents.addProduct', data)
})
clintIo.on(socketEvents.addComment, data => {
  console.log('socketEvents.addcomment', data)
})
clintIo.on(socketEvents.addReply, data => {
  console.log('socketEvents.addReply', data)
})
clintIo.on(socketEvents.updateComment, data => {
  console.log('socketEvents.updateComment', data)
})

$('#addNote').click(function () {
  const assignObj = {
    Product_title: $('#title').val(),
    Product_desc: $('#desc').val(),
    Product_price: $('#Price').val()
  }
  console.log({ assignObj: assignObj })
  clintIo.emit(socketEvents.addProduct, assignObj)
})

//----------function to dispaly add product event only -------------
clintIo.on('addProduct', data => {
  displayData(data)
})
function displayData (data) {
  console.log({data})
  let cartoona = ''
  for (let i = 0; i < data.length; i++) {
    cartoona += `
              <div class="col-md-4 my-2">
              <div class="p-2">
                  <div class="card text-center" style="width: 18rem;">
                      <div class="card-body">
                          <h5 class="card-title">${data[i].Product_title}</h5>
                          <p class="card-text">${data[i].Product_desc}</p>
                          <p class="card-text">${data[i].Product_price}</p>

                      </div>
                  </div>
              </div>
          </div>  
              `
  }
  $('.rowData').html(cartoona)
}
