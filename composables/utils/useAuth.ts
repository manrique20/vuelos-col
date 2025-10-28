
import flightsData from '../mock/data.json'


export const useAuth = () => {
    // Datos de usuarios
    const users = flightsData.users;

    const currentUser = useState('currentUser', () => null);

    const login = (email: string, password: string) => {
        const user = users.find(u =>
            u.email.toLowerCase() === email.toLowerCase() &&
            u.status === 'activo'
        );

        if (!user) {
            throw new Error('Usuario no encontrado');
        }

        if (user.password !== password) {
            throw new Error('Contraseña incorrecta');
        }

        const { password: _, ...userWithoutPassword } = user;
        currentUser.value = userWithoutPassword;

        if (import.meta.client) {
            setLoginUser(userWithoutPassword);
        }
        return userWithoutPassword;
    };

    const logout = () => {
        currentUser.value = null;
        if (process.client) {
            cookieStore.delete('loggedInUser');
        }
    };

    const isAuthenticated = computed(() => !!currentUser.value);

    const hasRole = (role: string) => {
        return currentUser.value?.rol === role;
    };

    return {
        login,
        logout,
        currentUser: readonly(currentUser),
        isAuthenticated,
        hasRole
    };
};