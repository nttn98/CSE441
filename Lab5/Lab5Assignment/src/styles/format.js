export const formatPrice = ( price ) =>
{
    return new Intl.NumberFormat( 'vi-VN', {
        style: 'currency',
        currency: 'VND',
        minimumFractionDigits: 0,  // To remove decimals if you don't need them
    } ).format( price );
};

export const formatDate = ( dateString ) =>
{
    const date = new Date( dateString );

    const day = String( date.getDate() ).padStart( 2, '0' );
    const month = String( date.getMonth() + 1 ).padStart( 2, '0' );
    const year = String( date.getFullYear() ).slice( -2 );
    const hours = String( date.getHours() ).padStart( 2, '0' );
    const minutes = String( date.getMinutes() ).padStart( 2, '0' );

    return `${ day }/${ month }/${ year } ${ hours }:${ minutes }`;
};