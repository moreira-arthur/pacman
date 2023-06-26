export default function criarImagem(src){
    const image = new Image();
    image.src = src;
    return image;
}