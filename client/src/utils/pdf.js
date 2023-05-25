import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'
// const printDocument = (input) => {
//   // const input = document.getElementById('divToPrint')
//   html2canvas(input).then((canvas) => {
//     const imgData = canvas.toDataURL('image/png')
//     const pdf = new jsPDF('l', '', 'a4')
//     pdf.addImage(imgData, 'JPEG', 0, 0, 300, 120)
//     // pdf.output('dataurlnewwindow')
//     pdf.save('download.pdf')
//   })
// }
//
//

// const printDocument = (input) => {
//   console.log(input)
//   // input = `<div>helloworld</div>`
//
//   // const doc = new jsPDF('l', 'mm', [1700, 1700])
//   const doc = new jsPDF()
//
//   doc.html(input, {
//     callback: function (doc) {
//       // setTimeout(() => {
//       //   console.log('download')
//       // }, 5000)
//       doc.save()
//     },
//     windowWidth: 1700,
//     width: 220,
//     x: -5,
//     y: -10,
//   })
// }

const printDocument = (input) => {
  const doc = new jsPDF()

  doc.html(input, {
    callback: function (doc) {
      doc.setFont('inter', 'normal')
      doc.save()
    },
    windowWidth: 379,
    width: 100,
    // x: -5,
    // y: -10,
  })
}
export default printDocument
