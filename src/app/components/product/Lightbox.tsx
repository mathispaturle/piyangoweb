import { Image } from "lucide-react";
import * as React from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

export default function LightboxPreview({ images }: { images: any }) {
    const [open, setOpen] = React.useState(false);

    return (
        <>
            <button type="button" className="text-white p-2 bg-main rounded-md" onClick={() => setOpen(true)}>
                <Image />
            </button>

            <Lightbox
                open={open}
                close={() => setOpen(false)}
                slides={images}
            />
        </>
    );
}