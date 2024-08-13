import { FC } from "react"

export type TypeRoles = {
    type?: 'admin' | 'user'
}

export type NextPageAuth<P = {}> = FC<P> & TypeRoles

export type TypeComponentAuthFields = { Component: TypeRoles}