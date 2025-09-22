import { useReactTable,getCoreRowModel,flexRender,getPaginationRowModel,getSortedRowModel,getFilteredRowModel } from "@tanstack/react-table"
import { useContext, useEffect, useRef, useState } from "react"
import { formatearFecha } from "../../../helpers/fechas"
import { ClienteContext } from "../context/ClienteContext"


const PopupClientesBuscar = () => {
    const [selectedId, setSelectedId] = useState(null);

    const {clientes,isPopupClienteBuscarOpen,closePopupClienteBuscar,setClienteBuscado}= useContext(ClienteContext)

    const [sorting, setSorting] = useState([])
    const [filtering, setFiltering] = useState('')

    const inputRef = useRef(null);

  
     const clienteSeleccionado = clientes.find((p) => p.id === selectedId);


    useEffect(() => {
        if (isPopupClienteBuscarOpen && inputRef.current) {
        inputRef.current.focus();
        setSelectedId(null)
        }
    }, [isPopupClienteBuscarOpen]);


     const handleButtonCerrar = () => {
        // alert(`Seleccionaste: ${selectedId}`);
        console.log('cerrando popup')
        console.log(selectedId)
        console.log(clienteSeleccionado)
        setClienteBuscado(clienteSeleccionado)
        setFiltering('')
        closePopupClienteBuscar();
     };

    const columns = [
        {
            id: "select",
            header: "",
            cell: ({ row }) => (
                <input
                type="radio"
                name="select-row"
                checked={row.original.id === selectedId}
                onChange={() => setSelectedId(row.original.id)}
                onClick={(e) => e.stopPropagation()} // evitar doble activación al dar clic directo en el radio
                />
            ),
        },
        { header:"ID", accessorKey:"id"},
        {header:"Nombre cliente", accessorKey:"nombre"},
        // {header:"Cliente", accessorKey:"nombre"
        //  },
        {   header:"Fecha nacimiento",
            accessorKey:"fechaNacimiento",
            cell:({getValue})=><div>{formatearFecha(getValue())}</div>
        },
        {   header:"Saldo",
            accessorKey:"saldo",
            cell: ({ getValue }) => <div className="precio">{`$${Number(getValue()).toFixed(2)}`}</div>
        },
    ]

    const table= useReactTable({
                                data:clientes,
                                columns,
                                getCoreRowModel:getCoreRowModel(),
                                getPaginationRowModel:getPaginationRowModel(),
                                getSortedRowModel:getSortedRowModel(),
                                getFilteredRowModel:getFilteredRowModel(),
                                state:{
                                  sorting,
                                  globalFilter:filtering
                                },
                                onSortingChange:setSorting,
                                onGlobalFilterChange:setFiltering,
                              })

  return (
    <>
        {isPopupClienteBuscarOpen && (
            <div className="popup-segundo">
              <div className="popup-content-amplio">
                <label >Buscar:</label>
                <input 
                    ref={inputRef}
                    type="text"
                    value={filtering}
                    onChange={e=> setFiltering(e.target.value)} />
                <table>
                    <thead>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <tr key={headerGroup.id}>
                            {headerGroup.headers.map((header) => (
                                <th key={header.id}
                                onClick={header.column.getToggleSortingHandler()    }
                                >
                                {
                                    <div>
                                    {flexRender(
                                        header.column.columnDef.header,
                                        header.getContext()
                                    )}
                                    {
                                        {asc:"⬆️",desc:"⬇️"}[
                                            header.column.getIsSorted() ?? null
                                            ]
                                        }
                                    </div>
                                }
                                </th>
                            ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody>
                        {table.getRowModel().rows.map((row) => {
                        const isSelected = row.original.id === selectedId;
                        return (
                        <tr
                                key={row.id}
                                onClick={() => setSelectedId(row.original.id)}
                                style={{
                                backgroundColor: isSelected ? "#d0f0c0" : "white",
                                cursor: "pointer",
                                }}
                            >
                                {row.getVisibleCells().map((cell) => (
                                <td key={cell.id}>
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </td>
                                ))}
                        </tr>
                );
            })}
                    </tbody>
                </table>
                <div>
                    <button
                        onClick={()=>table.setPageIndex(0)}>{'<<'}
                    </button>
                    <button
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                        >
                        {'<'}
                    </button>
                    <button
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}> {'>'}
                    </button>
                    <button
                    onClick={()=>table.setPageIndex(table.getPageCount()-1)}>{'>>'}
                    </button>
                    <br />
                    <button
                        onClick={handleButtonCerrar}>Cerrar</button>
                </div>
                </div>
            </div>  )
        }
  </>
  )
}
export default PopupClientesBuscar