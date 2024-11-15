class Transport {

    ride() {
        throw new Error("Method 'ride()' must be implemented.");
    }

    stop() {
        throw new Error("Method 'stop()' must be implemented.");
    }
}

class Car extends Transport {

    ride() {
        console.log("Driving a car...");
    }

    stop() {
        console.log("Car stopped.");
    }
}

class Bike extends Transport {

    ride() {
        console.log("Riding a bike...");
    }

    stop() {
        console.log("Bike stopped.");
    }
}

class TransportFactory {

    static createTransport(type) {
        switch (type) {
            case "car":
                return new Car();
            case "bike":
                return new Bike();
            default:
                throw new Error("Unknown transport type.");
        }
    }
}

const car = TransportFactory.createTransport("car");
car.ride();
car.stop();

const bike = TransportFactory.createTransport("bike");
bike.ride();
bike.stop();
