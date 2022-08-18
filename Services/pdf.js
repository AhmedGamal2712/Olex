const fs = require('fs')
const PDFDocument = require('pdfkit')
const moment = require('moment')

function createProductsTable (data, path, pdfName) {
  //create document
  let doc = new PDFDocument({ size: 'A4', margin: 50 })

  generateHeader(doc) // create the header
  generateProductsTable(doc, data) // enter the data of document
  generateFooter(doc) // create the end of the document

  doc.end()

  // upload pdf
  if (!fs.existsSync(path)) {
    console.log({ path: path })
    fs.mkdirSync(path, { recursive: true })
  }
  doc.pipe(fs.createWriteStream(`${path}/${pdfName}`))
}

function generateHeader (doc) {
  doc
    .fillColor('black')
    .fontSize(14)
    .text(`Product's Report of today`, 0, 50, { align: 'center' }) // title of document
    .text(`Date: ${moment(new Date()).format('Do MMMM YYYY')}`, 0, 70, {
      align: 'center'
    }) // date of document
}

function generateProductsTable (doc, data) {
  let i
  const dataTableTop = 170

  doc.font('Helvetica-Bold')
  generateTableRow(doc, dataTableTop, 'Id', 'Title', 'Description', 'Price EGP') // generate the columns of the table
  generateHr(doc, dataTableTop + 20) // generate line to seperate each row
  doc.font('Helvetica')

  // loop through the data items and generate a row for each
  for (i = 0; i < data.items.length; i++) {
    const item = data.items[i]
    const position = dataTableTop + (i + 1) * 35

    generateTableRow(
      doc,
      position,
      item._id,
      item.Product_title,
      item.Product_desc,
      formatCurrency(item.Product_price)
    )
    generateHr(doc, position + 30)
  }

  // total
  const total = data.items.reduce(
    (total, item) => total + item.Product_price,
    0
  )
  generateTableRow(
    doc,
    dataTableTop + (i + 1) * 40,
    '',
    '',
    'Total',
    formatCurrency(total)
  )
}

function generateFooter (doc) {
  doc
    .fontSize(10)
    .text('The end of the document', 50, 780, { align: 'center', width: 500 })
}

function generateTableRow (doc, y, item, _id, title, desc, price) {
  doc
    .fontSize(10)
    .text(item, 50, y)
    .text(_id, 200, y)
    .text(title, 280, y, { width: 90, align: 'right' })
    .text(desc, 370, y, { width: 90, align: 'right' })
    .text(price, 0, y, { width: 100, align: 'right' })
}

function generateHr (doc, y) {
  doc
    .strokeColor('#aaaaaa')
    .lineWidth(1)
    .moveTo(50, y)
    .lineTo(550, y)
    .stroke()
}

function formatCurrency (amount) {
  return parseInt(amount).toFixed(2)
}

module.exports = {
  createProductsTable
}
