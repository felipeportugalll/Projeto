export const getUserType = (value) => {
    var arr = ['Administrador', 'Funcionário', 'Aluno'];
    return arr[value-1];
};

export const getUserTypeLabel = (value) => {
    var arr = ['primary', 'default', 'secondary'];
    return arr[value-1];
};