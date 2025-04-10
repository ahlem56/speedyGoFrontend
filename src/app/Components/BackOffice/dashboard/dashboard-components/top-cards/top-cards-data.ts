export interface topcard {
    bgcolor: string,
    icon: string,
    title: string,
    subtitle: string
}

export const topcards: topcard[] = [

    {
        bgcolor: 'warning',
        icon: 'bi-person',
        title: 'Total Users',
        subtitle: '0'
    },
    {
        bgcolor: 'success',
        icon: 'bi bi-car-front',
        title: 'Total Trips',
        subtitle: '0'
    },
    {
        bgcolor: 'warning',
        icon: 'bi bi-basket3',
        title: '456',
        subtitle: 'Yearly Project'
    },
    {
        bgcolor: 'info',
        icon: 'bi bi-bag',
        title: '210',
        subtitle: 'Weekly Sales'
    },

] 