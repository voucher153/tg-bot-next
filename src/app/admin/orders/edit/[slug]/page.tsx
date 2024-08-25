
import { EditPageProduct } from "./Edit";

export default function UpdateOrder({params}: {params: {slug: string}}) {

    return (
        <div>
            <EditPageProduct id={params.slug} />
        </div>
    )
}