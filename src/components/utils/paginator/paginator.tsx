'use client'

import { Dispatch, FC, SetStateAction, useEffect } from "react"
import s from './paginator.module.scss'
import { Button } from "../button/button"

interface IPaginator {
    totalItemsCount: number 
    pageSize: number
    setPage:  Dispatch<SetStateAction<number>>, 
    currentPage: number, 
    pageLimit?: number
    pageNeighbours?: number
}

export const Paginator: FC<IPaginator> = ({
    totalItemsCount, 
    pageSize, 
    setPage, 
    currentPage, 
    pageLimit = 20, 
    pageNeighbours = 2
}) => {
    const totalPages = Math.ceil(totalItemsCount / pageSize);

    const LEFT_PAGE = 1
    const RIGHT_PAGE = totalPages;

    const range = (from: number, to: number, step: number = 1) => {
        let i = from;
        const range = []
        
        while (i <= to) {
            range.push(i);
            i += step
        }

        return range;
    }

    const totalNumbers = pageNeighbours * 2 + 3;
    const totalPagesBlocks = totalNumbers + 2;

    const fetchPages = () => {
        if (totalPages > totalPagesBlocks) {
            const startPage = Math.max(2, currentPage - pageNeighbours);
            const endPage = Math.min(totalPages - 1, currentPage + pageNeighbours);
            const pages = range(startPage, endPage);

            const hasSwitchLeft = startPage > 1;
            const hasSwitchRight = (totalPages - endPage) > 1;
            const spillOffset = totalNumbers - (pages.length + 1);

            if (hasSwitchLeft && !hasSwitchRight) {
                
                    const extraPages = range(startPage - spillOffset, startPage - 1);
                    const finalPages = [LEFT_PAGE, ...extraPages, ...pages, RIGHT_PAGE];
                    return finalPages;
            };
            
            if (!hasSwitchLeft && hasSwitchRight) {
                    const extraPages = range(endPage + 1, endPage + spillOffset);
                    const finalPages = [...pages, ...extraPages, RIGHT_PAGE];
                    return finalPages;
            }
                
            
            const newPages = [LEFT_PAGE, ...pages, RIGHT_PAGE];
            console.log(newPages)
            return newPages;
        }

        return range(1, totalPages);
    }
    console.log(RIGHT_PAGE)
    useEffect(() => {
        fetchPages()
    }, [currentPage])

    const pages = fetchPages()
    console.log(pages)
    return (
        <>
            {pages.length > 1 ? 
            <ul className={s['page-list']}>
                {pages.map( (page, id) => {
                    if (page === LEFT_PAGE) return (
                        <li key={id} className={s.page}>
                            <div onClick={() => setPage(page)}>
                                <Button
                                    pagination
                                    isCurrentPag={currentPage === page}
                                >
                                    {LEFT_PAGE}
                                </Button>
                            </div>
                            {pages[3] == 4 || pages.length < 7 ? null : <span className={s['left-page']}>...</span>}
                        </li>
                    )
                    if (page === RIGHT_PAGE) return (
                        <li key={id} className={s.page}>
                            {pages.length === 8 || totalItemsCount <= 90 ? 
                                null :
                                <span className={s['right-page']}>...</span>}
                            <div onClick={() => setPage(page)}>
                                <Button
                                    pagination
                                    isCurrentPag={currentPage === page}
                                >
                                    {RIGHT_PAGE}
                                </Button>
                            </div>
                        </li>
                    );
                    return (
                        <li key={id} className={s.page}>
                            <div onClick={() => setPage(page)}>
                                <Button
                                    pagination
                                    isCurrentPag={currentPage === page}
                                >
                                    {page}
                                </Button>
                            </div>
                        </li>
                    )
                })}
            </ul> : null}
        </>
    )
}