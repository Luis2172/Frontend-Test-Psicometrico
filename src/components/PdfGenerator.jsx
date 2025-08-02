import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import logo from '../assets/testtec.png'; // Asegúrate que esta ruta sea correcta

export const generarPDF = ({ user, testType, logicaScore, score, mensaje, result }) => {
  const doc = new jsPDF();

  // Agregar logotipo centrado arriba (ajusta tamaño según necesidad)
  const pageWidth = doc.internal.pageSize.getWidth();
  const imgWidth = 40;
  const imgHeight = 40;
  const imgX = (pageWidth - imgWidth) / 2;
  doc.addImage(logo, 'PNG', imgX, 10, imgWidth, imgHeight);

  // Título
  doc.setFontSize(20);
  doc.setTextColor(38, 94, 146);
  doc.setFont('helvetica', 'bold');
  doc.text('Resultados del Test Psicométrico', pageWidth / 2, 60, { align: 'center' });

  // Línea separadora
  doc.setDrawColor(150);
  doc.line(20, 65, pageWidth - 20, 65);

  // Datos personales
  doc.setFontSize(12);
  doc.setTextColor(0);
  doc.setFont('helvetica', 'normal');

  const data = [
    [`Nombre completo:`, `${user.name} ${user.apellido}`],
    [`Nivel académico:`, user.nivel],
    [`Carrera seleccionada:`, testType],
    [`Puntaje lógico:`, `${logicaScore}`],
    [`Puntaje total:`, `${score}`],
    [`Resultado final:`, result],
    [`Observación:`, mensaje],
  ];

  autoTable(doc, {
    startY: 75,
    head: [['', '']],
    body: data,
    theme: 'plain',
    styles: {
      fontSize: 12,
      textColor: 20,
      cellPadding: 4,
    },
    columnStyles: {
      0: { fontStyle: 'bold' },
    },
  });

  // Guardar
  doc.save(`resultados_${user.name}_${user.apellido}.pdf`);
};
