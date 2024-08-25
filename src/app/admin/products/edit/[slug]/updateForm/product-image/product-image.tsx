'use client'

import { TypeProductData } from "@/types/product.interface";
import Image from "next/image";
import { ChangeEvent, FC, useEffect, useRef, useState } from "react";
import { UseFormRegister, UseFormSetValue } from "react-hook-form";
import s from './product-image.module.scss'

interface IProductImage {
    register: UseFormRegister<TypeProductData>
    src?: string
    setValue: UseFormSetValue<TypeProductData>
}

export const ProductImage: FC<IProductImage> = ({ setValue, register, src }) => {
    
    const [imageFile, setImageFile] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleImageUploadClick = () => {
        fileInputRef.current?.click();
    };

    const updateImage = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];
            const url = URL.createObjectURL(file)
            setImageFile(url);
            setValue('file', file)
            debugger
        }
    };

    // const handleUploadedFile = (event: any) => {
    //     const file = event.target.files[0];
    //     debugger
    //     console.log(file)
    //     const urlImage = URL.createObjectURL(file);

    //     setPreview(urlImage);
    // };

    const checkUrl = () => {
        if (imageFile) {
            return <Image width={130} height={120} src={imageFile} alt="image" />
        } else if (src) {
            return <Image width={130} height={120} src={src} alt="src image" />
        }
        return null
    }

    return (
        <div className={s.images}>
            <div className={s.image}>
                {checkUrl()}
            </div>
            <div className={s['input-block']}>
                <input 
                    {...register("file")} 
                    type="file"
                    onChange={updateImage}
                    className={s.input}
                    ref={fileInputRef}
                />
            </div>
            {imageFile ? 
                <div 
                    onClick={() => {
                        fileInputRef.current!.value = ''
                        setValue('file', '')
                        setImageFile(null)
                    }}
                    className={s.reset}
                >
                    Сбросить фото
                </div> : null}
        </div>
    )
};