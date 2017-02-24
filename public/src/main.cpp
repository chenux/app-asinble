#include <iostream>
#include <cmath>

using namespace std;

class Cilindro {
	
	private:
	
	float r;
	float h;
	
	public:

	Cilindro(float a = 0, float b  = 0){
		this->r = a;
		this->h = b;
	}
	
	// Establecer un valor -> r
	void set_r(float v) {
		this->r = v;
	}
	
	// Obtener el valor de r
	float get_r(void) {
		return this->r; 
	}
	
	// Establecer un valor -> h
	void set_h(float v) {
		this->h = v;
	}
	
	// Obtener el valor de r
	float get_h(void) {
		return this->h; 
	}
	
	float vol(void) {
		return M_PI * pow(this->r,2) * this->h;
	}
	
	
	float sup(void) {
		return 2 * M_PI * this->r * this->h + 2 * M_PI * pow(this->r,2);
	}
	
};

int main() {

	
	
	float r,h;
	//cout << "Introduce el radio y la altura: ";
	cin >> r >> h;
	
    Cilindro cil(r,h);
	//cil.set_r(r);
	//cil.set_h(h);
	
	cout << endl << cil.get_r() << endl 
		<< cil.get_h() <<  endl
		<< cil.vol() << endl 
		<< cil.sup() << endl ;
	
	
	

	return 0;






}