const QRCode = require('qrcode')
async function Qr_code (doc , model){
    const qrData = JSON.stringify(doc)
    const qrCode = await QRCode.toDataURL(qrData, {
          errorCorrectionLevel: 'H'
        })
    await model.findOneAndUpdate(
          {
            _id: doc._id
          },
          {
            qrCode: qrCode
          },
          {
            new: true
          }
        )
  }  


module.exports = Qr_code