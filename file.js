var numPage = 1; // Numéro de page courante
var totalPage = null; // Nombre de pages
var oPdf = PDFJS.getDocument('CV_Shamounni_2020.pdf');
oPdf.then(renderPDF);
function renderPDF(pdf){
  // au premier appel de la fonction, on récupère le nombre de pages
  if(totalPage == null){
    totalPage = pdf.numPages;
  }
  // Si on est dans les pages du PDF, on récupère la page et via Promise, on demande le rendu de la page
  if(numPage <= totalPage){
    pdf.getPage(numPage).then(renderPage);
    numPage++;
    // Puis 1 seconde plus tard, on affiche la page suivante
    setTimeout(function() {
      renderPDF(pdf);
    }, 1000);
  }
}
function renderPage(page){
    // L'échelle de l'image
    var scale = 1;
    var viewport = page.getViewport(scale);
    // Le canvas qui contiendra le rendu du PDF
    var canvas = document.getElementById('canvasPDF');
    var context = canvas.getContext('2d');
    // On définit la taille du canvas pour lui appliquer la taille du PDF
    canvas.height = viewport.height;
    canvas.width = viewport.width;
    // Contexte de rendu avec le contexte 2D du canvas et le viewport pour la page PDF à afficher
    var renderContext = {
      canvasContext: context,
      viewport: viewport
    };
    // On lance le rendu de la page
    page.render(renderContext);
}