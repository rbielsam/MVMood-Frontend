export default function Ad (props) {
    const [href, src, alt] = props;

    return (
        <>
            <a href={href}><img src={src} alt={alt} /></a>
        </>
    );
}

/*
<script>
    let href = "https://spain.iddink.es/ca/afas/projectes-de-reutilitzacio-de-llibres/";
    let src = "src/lib/assets/ads/Iddlink.png";
    let alt = "Iddlink";
</script>

<a {href}><img {src} {alt} /></a>
*/