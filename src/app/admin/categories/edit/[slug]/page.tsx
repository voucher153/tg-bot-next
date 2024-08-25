import { EditPageCategories } from "./Edit";

export default function CreateProduct({params}: {params: {slug: string}}) {

    return (
        <div>
            <EditPageCategories id={params.slug} />
        </div>
    )
}