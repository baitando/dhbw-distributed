package de.baitando.dhbw.distributed.rmi;

import de.baitando.dhbw.distributed.Task;

import java.rmi.registry.LocateRegistry;
import java.rmi.registry.Registry;
import java.util.List;

public class Client {

    public static void main(String[] args) {
        String host = (args.length < 1) ? null : args[0];
        try {
            Registry registry = LocateRegistry.getRegistry(host);
            TaskService stub = (TaskService) registry.lookup("TaskService");
            List<Task> tasks = stub.getTasks();
            System.out.println("response: " + tasks);
        } catch (Exception e) {
            System.err.println("Client exception: " + e.toString());
            e.printStackTrace();
        }
    }
}
