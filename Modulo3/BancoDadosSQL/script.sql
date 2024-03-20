CREATE TABLE Clients(
    clientId SERIAL PRIMARY KEY,
    name VARCHAR NOT NULL,
    cpf VARCHAR NOT NULL,
    phone VARCHAR NOT NULL,
    email VARCHAR NOT NULL,
    address VARCHAR NOT NULL
);

CREATE TABLE Suppliers(
	supplierId SERIAL PRIMARY KEY,
    name VARCHAR NOT NULL,
    cnpj VARCHAR NOT NULL,
    phone VARCHAR NOT NULL,
    email VARCHAR NOT NULL,
    address VARCHAR NOT NULL
);

CREATE TABLE Products(
	productId SERIAL PRIMARY KEY,
    name VARCHAR NOT NULL,
    description VARCHAR NOT NULL,
    value NUMERIC NOT NULL,
    stock INT NOT NULL,
    supplierId INT NOT NULL,
    CONSTRAINT fkSupplier FOREIGN KEY (supplierId) REFERENCES Suppliers (supplierId)
);

CREATE TABLE Sales(
	saleId SERIAL PRIMARY KEY,
    value NUMERIC NOT NULL,
    data DATE NOT NULL,
    clientId INT NOT NULL,
    productId INT NOT NULL,
    CONSTRAINT fkClient FOREIGN KEY (clientId) REFERENCES Clients (clientId),
    CONSTRAINT fkProduct FOREIGN KEY (productId) REFERENCES Products (productId)
)