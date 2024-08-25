
import { EditPageProduct } from "./Edit";

export default function CreateProduct({params}: {params: {slug: string}}) {

    return (
        <div>
            <EditPageProduct id={params.slug} />
        </div>
    )
}