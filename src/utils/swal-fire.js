import Swal from 'sweetalert2'

export const SwalFire = (type, text) => {
    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
    })

    Toast.fire({
        icon: type,
        title: text
    })
}


export const SwalLoading = () => {
    Swal.fire({
        toast: true,
        position: 'top-end',
        title: 'Loading...',
        showConfirmButton: false,
        allowEscapeKey: false,
        didOpen: () => {
            Swal.showLoading()
        }
    });

    return Swal
}