export const formatearFecha = (fecha) => {
    // alert('entrando a formatear fecha')
    let tfecha = new Date().toISOString().split("T")[0]
    if (fecha){
        tfecha = fecha.slice(0,10)
    }
    // console.log('entrando a fecha')
    // console.log(tfecha)
    
    const [año, mes, dia] = tfecha.split('-');
    const fechaFormatoCorrecto = `${dia.padStart(2, '0')}/${mes.padStart(2, '0')}/${año}`
    
    return fechaFormatoCorrecto
}

export const fechaHoy = ()=>{
    let tfecha = new Date().toISOString().split("T")[0]
    
    const [año, mes, dia] = tfecha.split('-');
    return `${año}-${mes.toString().padStart(2, "0")}-${dia
      .toString()
      .padStart(2, "0")}`;
  }
