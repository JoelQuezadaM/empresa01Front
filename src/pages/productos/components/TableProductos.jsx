import { useReactTable,getCoreRowModel,flexRender,getPaginationRowModel,getSortedRowModel,getFilteredRowModel } from "@tanstack/react-table"
import dayjs from "dayjs"
import { useContext, useEffect, useState } from "react"
import { ProductosContext } from "../context/ProductosContext"
import axios from "axios"



const TableProductos = () => {
    const {productos,setProductos,setMuestraProducto,setEditaProducto}= useContext(ProductosContext)

    const [sorting, setSorting] = useState([])
    const [filtering, setFiltering] = useState('')

    const [pagina, setPagina] = useState(1);
    const [totalPaginas, setTotalPaginas] = useState(1);
    const [limite] = useState(10);
    const [busqueda, setBusqueda] = useState('');
    const [busquedaInput, setBusquedaInput] = useState('');

    const [loading, setLoading] = useState(false)//haciendo una consulta en la base de datos


    useEffect(() => {
    if (loading) {
      document.body.classList.add("waiting");
      console.log('entrando loading')
    } else {
      document.body.classList.remove("waiting");
    }
  }, [loading]);

    const mostrarProductos = async()=>{
        try {
          const sort = sorting[0] || {}; // puede estar vacío
          setLoading(true)
          const respuesta = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/productospag`, {
          params: {
            page: pagina,
            limit: limite,
            search:busqueda,
            orderBy: sort.id,
            orderDirection: sort.desc ? 'desc' : 'asc',}
          })
          setProductos(respuesta.data.data) 
          setTotalPaginas(respuesta.data.totalPages)
        }catch(error){
          console.log(error)
        }finally{
          setLoading(false)
        }
    }
    useEffect(() => {
      mostrarProductos();
    }, [pagina, busqueda,sorting]);

    useEffect(() => {
        setBusqueda(busquedaInput);
        setPagina(1); // reinicia a la página 1 al buscar
    }, [busquedaInput]);

    const handleMuestraProducto = (producto) => {
        setMuestraProducto(producto);
    }; 

    const handleButtonEditaProducto = (producto) => {
        setEditaProducto(producto);
    };

    const handleBorrarProducto = async(producto)=>{
      const confirmar = confirm('Deseas eliminar el producto?')
      if (confirmar){
          try {
              await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/productos/${producto.id}`)
              setProductos(productos.filter(tProducto=>tProducto.id !== producto.id))
          }
          catch(error){
              console.log(error.response.data.msg)
          }
      }  
    }
    

    const columns = [
        {header:"ID",accessorKey:"id"},
        {header:"Nombre",accessorKey:"nombre",enableSorting: true},
        {header:"CODIGO",accessorKey:"codigo"},
        {header: 'Imagen',accessorKey: 'image',
          cell: ({ row }) => (
              <img
                src={`${row.original.foto}.jpg`}
                alt={row.original.nombre}
                style={{ width: 30, height:30, 
                         borderRadius: '50%', objectFit:'cover',
                         margin:0, padding:0, verticalAlign:'middle',
                         lineHeight:0,
                         display:"inline-block"}}
              />),
          enableSorting: false,
        },
        {header:"Existencias",accessorKey:"existencias"},
        {header:"Precio",accessorKey:"Precio",
            cell: ({ getValue }) => <div className="precio">{`$${Number(getValue()).toFixed(2)}`}</div>

        },
        {header: 'Actions',id: 'details',
          cell: ({ row }) => (
            <>
            <button onClick={() => handleMuestraProducto(row.original)}>💡</button>
            <button onClick={() => handleButtonEditaProducto(row.original)}>✎</button>
            <button onClick={() => handleBorrarProducto(row.original)}>🗑️</button>
            </>
          ),
        },
    ]

    const table= useReactTable({
                                enableSortingRemoval: false,
                                data:productos,
                                columns,
                                getCoreRowModel:getCoreRowModel(),
                                getPaginationRowModel:getPaginationRowModel(),
                                getSortedRowModel:getSortedRowModel(),
                                getFilteredRowModel:getFilteredRowModel(),
                                manualPagination: true, 
                                manualSorting: true,
                                pageCount: totalPaginas,
                                state: {
                                  pagination: {
                                    pageIndex: pagina - 1,
                                    pageSize: limite,
                                    globalFilter:filtering,
                                  },
                                  sorting
                                },
                                onSortingChange:setSorting,
                                onGlobalFilterChange:setFiltering,
                              })

  return (
    <div 
        // className="waiting"
        // style={{
        // cursor: 'wait', // Cambia el cursor a una mano para enlaces
        // Para una imagen personalizada:
        // cursor: 'url("ruta/a/tu/cursor.png"), auto',
      // }}
          >
        <label >Buscar:</label>
        <input 
            type="text"
            placeholder="Nombre del producto"
            // value={filtering}
            value={busquedaInput}
            // onChange={e=> setFiltering(e.target.value)} 
            onChange={(e) => setBusquedaInput(e.target.value)}
            style={{ padding: '0.5rem', width: '100%', marginBottom: '1rem' }}
            />
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
                    <tr 
                      key={row.id}>
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
                  onClick={()=>setPagina(1)}
                  disabled={pagina ===1 }
                  >{'<<'}
            </button>
            <button
                onClick={() => setPagina(p => Math.max(p - 1, 1))}
                disabled={pagina === 1}
               >
                 {'<'}
            </button>
            <button
                onClick={() => setPagina(p => Math.min(p + 1, totalPaginas))}
                disabled={pagina === totalPaginas}
                >
                 {'>'}
            </button>
            <button
                onClick={()=>setPagina(totalPaginas)}
                disabled={pagina === totalPaginas}>
              {'>>'}
            </button>
            <span style={{ margin: '0 1rem' }}>
              Página {pagina} de {totalPaginas}
            </span>
        </div>
    </div>
  )
}

export default TableProductos