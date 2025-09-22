import { useReactTable,getCoreRowModel,flexRender,getPaginationRowModel,getSortedRowModel,getFilteredRowModel } from "@tanstack/react-table"
import dayjs from "dayjs"
import { useContext, useEffect, useState } from "react"
import axios from "axios"
import { UsuariosContext } from "../context/UsuariosContext"
import useAuth from "../../../hooks/useAuth"


const TableUsuarios = () => {
    const {usuarios,setUsuarios,setMuestraUsuario,setEditaUsuario,openPopupUsuarioEditar,openPopupUsuarioMostrar,openPopupUsuarioMuestraPermisos}= useContext(UsuariosContext)

    const { permisos } = useAuth()

    const [sorting, setSorting] = useState([])
    const [filtering, setFiltering] = useState('')

    const [pagina, setPagina] = useState(1);
    const [totalPaginas, setTotalPaginas] = useState(1);
    const [limite] = useState(10);
    const [busqueda, setBusqueda] = useState('');
    const [busquedaInput, setBusquedaInput] = useState('');


    const tienePermiso = (modulo, permiso) => {
        return permisos?.[modulo]?.includes(permiso);
    };


    const mostrarUsuarios = async()=>{
        try {
          const sort = sorting[0] || {}; // puede estar vacío
          const respuesta = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/usuarios`, {
          params: {
            page: pagina,
            limit: limite,
            search:busqueda,
            orderBy: sort.id,
            orderDirection: sort.desc ? 'desc' : 'asc',}
          })
          setUsuarios(respuesta.data.data) 
          setTotalPaginas(respuesta.data.totalPages)
        }catch(error){
          console.log(error)
        }
    }

    useEffect(() => {
      mostrarUsuarios();
    }, [pagina, busqueda,sorting]);

    useEffect(() => {
      const timeout = setTimeout(() => {
        setBusqueda(busquedaInput);
        setPagina(1); // reinicia a la página 1 al buscar
      }, 500); // debounce de 500ms
      return () => clearTimeout(timeout);
    }, [busquedaInput]);

    const handleMuestraUsuario = (usuario) => {
        setMuestraUsuario(usuario);
        openPopupUsuarioMostrar()
    }; 
    const handleEditaUsuario = (usuario) => {
         setEditaUsuario(usuario);
         openPopupUsuarioEditar()
     };


    const handleBorrarUsuario = async(usuario)=>{
      const confirmar = confirm('Deseas eliminar el usuario?')
      if (confirmar){
          try {
              await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/usuarios/${usuario.id}`)
              setUsuarios(usuarios.filter(tUsuario=>tUsuario.id !== usuario.id))
          }
          catch(error){
              console.log(error.response.data.msg)
          }
      }  
    }

    const handleMuestraPermisos = (usuario)=>{
      setMuestraUsuario(usuario);
      openPopupUsuarioMuestraPermisos()
    }

    const columns = [
        {header:"ID",accessorKey:"id"},
        {header:"Nombre",accessorKey:"nombre",enableSorting: true},
        {header:"Email",accessorKey:"email"},
        {header:"rol",accessorKey:"nombreRol"},
        
        {header: 'Foto',
          cell: ({ row }) => {
            const { id, foto, updated_at } = row.original;
            if (!foto) return <span>Sin foto</span>;
            const timestamp = updated_at ? new Date(updated_at).getTime() : Date.now();
            return (
              <img
                src={`http://localhost:4000/uploads/${foto}?v=${timestamp}`}
                alt="Foto"
                width={50}
                style={{width: 50,height: 50,borderRadius: '50%',objectFit: 'cover',
                  margin: 0,padding: 0,verticalAlign: 'middle',
                  lineHeight: 0,display: 'inline-block'}}
              />
            );
          }
        },

        {header:"Confirmado",accessorKey:"confirmado"},
        {header:"Token",accessorKey:"token"},
        {header: 'Actions',id: 'details',
          // cell: ({ row }) =>(
          //   <>
          //   <button onClick={() => handleMuestraUsuario(row.original)}>💡</button>
          //   <button onClick={() => handleButtonEditaUsuario(row.original)}>✎</button> 
          //   <button onClick={() => handleMuestraPermisos(row.original)}>🔍</button>
          //   <button onClick={() => handleBorrarUsuario(row.original)}>🗑️</button>
          //   </>
          // ),
          cell: ({ row }) => {
            const usuario = row.original;
            return (
              <>
                {tienePermiso("usuarios", "ver") && (
                  <button onClick={() => handleMuestraUsuario(usuario)}>💡</button>
                )}
                {tienePermiso("usuarios", "altas") && (
                  <button onClick={() => handleEditaUsuario(usuario)}>✎</button>
                )}
                {tienePermiso("usuarios", "permisos") && (
                  <button onClick={() => handleMuestraPermisos(usuario)}>🔍</button>
                )}
                {tienePermiso("usuarios", "bajas") && (
                  <button onClick={() => handleBorrarUsuario(usuario)}>🗑️</button>
                )}
              </>
            );
          },
        },
    ]

    const table= useReactTable({
                                enableSortingRemoval: false,
                                data:usuarios,
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
    <div>
        <label >Buscar:</label>
        <input 
            type="text"
            placeholder="Nombre del usuario"
            value={busquedaInput}
            onChange={(e) => setBusquedaInput(e.target.value)}
            style={{ padding: '0.5rem', width: '100%', marginBottom: '1rem' }}
            />
              
        <div style={{ overflowY: 'auto',height: "calc(100vh - 300px)" }}>
        <table style={{ minWidth: '1200px', width: '100%' }}>
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
        </div>
        <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '0.5rem',
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: '1rem',
        }}
        >
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

export default TableUsuarios