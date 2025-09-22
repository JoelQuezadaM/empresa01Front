import { useReactTable,getCoreRowModel,flexRender,getPaginationRowModel,getSortedRowModel,getFilteredRowModel } from "@tanstack/react-table"
import { useContext, useState } from "react"
import { PedidosContext } from "../context/PedidosContext"
import axios from "axios"



const TablePedidoDetalles = () => {
  
    const {dataDetalle,setEditaPedidoDetalle,setActualizoDataDetalle,pedidoSeleccionado,setPedidoSeleccionado}= useContext(PedidosContext)

    const [sorting, setSorting] = useState([])
    const [filtering, setFiltering] = useState('')
    const [pagina, setPagina] = useState(0)

    const handleButtonEdita = (pedidoDetalle) => {
        const tPedidoDetalle={
              id_pedido_detalle:pedidoDetalle.id_pedido_detalle,
              id_pedido:pedidoSeleccionado.id_pedido,
              id_producto:pedidoDetalle.id_producto,
              cantidad:pedidoDetalle.cantidad,
              precio_unitario:pedidoDetalle.precio_unitario
        }
        setEditaPedidoDetalle(tPedidoDetalle);
    }

    const handleButtonDelete = async(pedidoDetalle) => {
      const confirmar = confirm('Deseas eliminar el detalle?')
        if (confirmar){
          try {
            await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/pedidodetalles/${pedidoDetalle.id_pedido_detalle}`)
            setActualizoDataDetalle(true)
            const respuesta = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/pedidos/mostrar/${pedidoDetalle.id_pedido}`)
            setPedidoSeleccionado(respuesta.data[0])
          }
          catch(error){
              console.log(error)
          }
        }  
    };

    const columns = [
        {
            header:"Id Producto",
            accessorKey:"id_producto",
        },
        {
            header:"Producto",
            accessorKey:"nombre",
        },
        {
            header:"cantidad",
            accessorKey:"cantidad"
        },
        {
            header:"Precio Unitario",
            accessorKey:"precio_unitario",
            cell: ({ getValue }) => <div className="precio">{`$${Number(getValue()).toFixed(2)}`}</div>
        },
        {
            header:"Subtotal",
            accessorKey:"subtotal",
            cell: ({ getValue }) => <div className="precio">{`$${Number(getValue()).toFixed(2)}`}</div>
        },
        {
          header: 'Actions',
          id: 'details',
          cell: ({ row }) => (
            <>
            <button onClick={() => handleButtonEdita(row.original)}>✎</button>
            <button onClick={() => handleButtonDelete(row.original)}>🗑️</button>
            </>
          ),
        },
    ]

    const table= useReactTable({
                                data:dataDetalle,
                                columns,
                                getCoreRowModel:getCoreRowModel(),
                                getPaginationRowModel:getPaginationRowModel(),
                                getSortedRowModel:getSortedRowModel(),
                                getFilteredRowModel:getFilteredRowModel(),
                                state:{
                                  sorting,
                                  globalFilter:filtering,
                                  // pagination: {
                                  //   pageIndex: 0,
                                  //   pageSize: 4, // <-- AQUÍ defines cuántos renglones mostrar
                                  // },
                                },
                                onSortingChange:setSorting,
                                onGlobalFilterChange:setFiltering,
                              })

  return (
    <div>
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
                 {table.getRowModel().rows.map((row)=>(
                    <tr key={row.id}>
                        {row.getVisibleCells().map((cell)=>(
                             <td key={cell.id}>
                                 {flexRender(cell.column.columnDef.cell,cell.getContext())}
                            </td>
                        ))}
                    </tr>
                  ))}  
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
         
        </div>
    </div>
  )
}

export default TablePedidoDetalles