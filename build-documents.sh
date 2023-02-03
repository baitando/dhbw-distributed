DOCKER_CMD="docker run -it --rm -v $PWD:/work -w /work rstropek/pandoc-latex"
OUT_DIR="out"

mkdir -p $OUT_DIR

function build {
  $DOCKER_CMD -s "$1"/"$1".md --metadata-file "$1"/"$1".yaml -o "$OUT_DIR"/"$1".pdf --template eisvogel.latex
}

build 00-intro