BUILD_COMMAND=$1
if [ -z "$BUILD_COMMAND" ]; then
  BUILD_COMMAND="docker run -it -v $PWD:/documents/ asciidoctor/docker-asciidoctor:1.38 asciidoctor-pdf"
fi

OUT_DIR="out"
mkdir -p $OUT_DIR

function build {
  $BUILD_COMMAND -a pdf-theme=theme.yml -D "$OUT_DIR" "$1"/"$1".adoc
}

build 00-intro