import { useReactTable,getCoreRowModel,flexRender,getPaginationRowModel,getSortedRowModel,getFilteredRowModel } from "@tanstack/react-table"
import { useContext, useState } from "react"
import { PedidosContext } from "../context/PedidosContext"
import { fechaHoy, formatearFecha } from "../../../helpers/fechas"
import axios from "axios"


const TablePedidos = () => {
  
    const {pedidos,setPedidoSeleccionado,setEditaPedido,setActualizoDataDetalle,setPedidos}= useContext(PedidosContext)

    const [sorting, setSorting] = useState([])
    const [filtering, setFiltering] = useState('')

    const handleButtonMuestraPedido = (pedido) => {
      //cuando se inserta un registro se actualiza el arreglo DataDetalle
      setActualizoDataDetalle(true)
      setPedidoSeleccionado(pedido);
    };

    const handleButtonClick2 = (pedido) => {
        setEditaPedido(pedido);
    };

    const handleNuevoPedido = ()=>{
        const aPedido ={
            id_cliente:0,
            fecha:fechaHoy(),
            estatus:0,
            total:0
        }
        setPedidoSeleccionado(aPedido)
    }

    const handleDelete = async(pedido)=>{
      const confirmar = confirm('Deseas eliminar el pedido?')
        if (confirmar){
          try {  
            await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/pedidos/${pedido.id_pedido}`)
            setPedidos(pedidos.filter(aPedido=>aPedido.id_pedido !== pedido.id_pedido))
          }
          catch(error){
              console.log(error)
          }
        }  
    }

    const columns = [
        {header:"ID",accessorKey:"id_pedido"},
        {header:"Cliente",accessorKey:"id_cliente"},
        {header:"Cliente",accessorKey:"nombre"},
        {header:"Fecha",accessorKey:"fecha",
            cell:({getValue})=><div>{formatearFecha(getValue())}</div>
        },
        {header:"Estatus",accessorKey:"estatus"},
        {
            header:"Total",
            accessorKey:"total",
            cell: ({ getValue }) => <div className="precio">{`$${Number(getValue()).toFixed(2)}`}</div>

        },
        {header: 'Actions',id: 'details',
          cell: ({ row }) => (
            <>
            {/* <button onClick={() => handleButtonClick(row.original)}>➕</button> */}
            <button onClick={() => handleButtonMuestraPedido(row.original)}>✎</button>
            <button onClick={() => handleDelete(row.original)}>🗑️</button>
            </>
          ),
        },
    ]

    const table= useReactTable({
            data:pedidos,
            columns,
            manualPagination:true,
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
    <div>
        <label >Buscar:</label>
        <input 
            type="text"
            value={filtering}
            onChange={e=> setFiltering(e.target.value)} />
        <div className="scroll-container">    
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
       </div>
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
              onClick={()=>handleNuevoPedido()}
              >Nuevo</button>
        </div>
    </div>
  )
}

export default TablePedidos