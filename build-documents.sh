PDF_CMD=$1
HTML_CMD=$2
if [ -z "$PDF_CMD" ]; then
  PDF_CMD="docker run -it -v $PWD:/documents/ asciidoctor/docker-asciidoctor:1.38 asciidoctor-pdf"
fi

if [ -z "$HTML_CMD" ]; then
  HTML_CMD="docker run -it -v $PWD:/documents/ asciidoctor/docker-asciidoctor:1.38 asciidoctor"
fi

OUT_DIR="out"
OUT_DIR_HTML="$OUT_DIR/html"
OUT_DIR_PDF="$OUT_DIR/pdf"
rm -rf $OUT_DIR
mkdir -p $OUT_DIR_HTML
mkdir -p $OUT_DIR_PDF


$HTML_CMD -D "$OUT_DIR_HTML" index.adoc
$PDF_CMD -a pdf-theme=theme.yml -D "$OUT_DIR_PDF" index.adoc


function copy() {
  mkdir -p $OUT_DIR_HTML/"$1"
  cp ./"$1"/*.png $OUT_DIR_HTML/"$1"/
}


copy 01-jsonrpc
copy 02d-backend-js/uebung-2