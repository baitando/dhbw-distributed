package de.baitando.dhbw.distributed.rmi;

import de.baitando.dhbw.distributed.Task;

import java.rmi.RemoteException;
import java.rmi.registry.LocateRegistry;
import java.rmi.registry.Registry;
import java.rmi.server.UnicastRemoteObject;
import java.util.List;

public class Server implements TaskService {

    @Override
    public List<Task> getTasks() throws RemoteException {
        return List.of(
                new Task("Aufgabe 1", "Meine erste Aufgabe", "05.04.2022", "Max Mustermann"),
                new Task("Aufgabe 2", "Meine zweite Aufgabe", "06.04.2022", "Miriam Mustermann")
        );
    }

    public static void main(String[] args) {
        try {
            Server obj = new Server();
            TaskService stub = (TaskService) UnicastRemoteObject.exportObject(obj, 0);

            // Bind the remote object's stub in the registry
            Registry registry = LocateRegistry.getRegistry();
            registry.bind("TaskService", stub);

            System.out.println("Server ready");
        } catch (Exception e) {
            System.err.println("Server exception: " + e.toString());
            e.printStackTrace();
        }
    }
}
