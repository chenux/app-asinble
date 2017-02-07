
#include <iostream>
#include <iomanip>


using namespace std;

// Clase matriz.
class Matrix {
private:
    
    int **ma; // Apuntador para la matriz (ma).
    int n, m ; // Filas y Columnas.
    
public:
    
    // Constructor.
    Matrix(int n = 0, int m = 0) {
        
        this->n = n; // Filas
        this->m = m; // Columnas
        this->ma = new int * [n]; // Creación de las filas.
        
        // Ciclo para crear las filas.
        for (int i = 0; i < this->n; i++) {
            this->ma[i] = new int[m]; // Creación de la fila.
        }
        
    }
    
    
    // Sobrecarga de entrada de flujo.
    friend istream & operator >> (istream &is, Matrix &mx) {
        
        cout << endl;
        
        for (int i = 0; i< mx.n; i++) {
            for (int j = 0; j < mx.m ; j++) {
                
                is >> mx.ma[i][j]; //Almacenar el valor en la matriz.
            }
        }
        
        return is;
        
    }
    
    // Sobrecarga del producto.
    friend Matrix operator * (Matrix muno, Matrix mdos) {
        
        Matrix mr(muno.n, mdos.m);
        
        // Operación
        for (int i = 0; i < muno.m; i++) {
            for (int j = 0; j < mdos.m; j++) {
                mr.ma[i][j] = 0; // Establecemos a 0.
                for (int k = 0; k < muno.m; k++) {
                    // Sumamos el resultado del producto.
                    mr.ma[i][j] += muno.ma[i][k] * mdos.ma[k][j];
                }
            }
        }
        
        return mr;
        
    }
    
    // Sobrecarga de la salida de flujo.
    friend ostream & operator << (ostream &os, Matrix &mx) {
        
        
        for (int i = 0; i< mx.n; i++) {
            // Imprimir las filas.
            for (int j = 0; j < mx.m ; j++) {
                os << setw(4) << mx.ma[i][j];
            }
            cout << endl; // Nueva línea.
        }
        
        return os;
        
    }
    
    
};


int main() {
    
    int f = 0, c = 0; // Número de Filas y Columnas.
    
    cout << "Introduce el número de filas y columnas: ";
    cin >> f >> c;
    
    // Objetos tipo Matrix.
    Matrix mxa(f,c), mxb(f,c), mxr(f,c);
    
    cout << "Introduce los valores de la matriz A " << endl;
    cin >> mxa;
    
    cout << "Introduce los valores de la matriz B " << endl;
    cin >> mxb;
    
    // Operación.
    mxr = mxa * mxb;
    
    // Salida.
    cout << endl << endl << mxr;
    
    return 0;
}





