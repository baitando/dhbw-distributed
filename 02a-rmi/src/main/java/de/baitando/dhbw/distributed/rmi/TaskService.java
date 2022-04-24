package de.baitando.dhbw.distributed.rmi;

import de.baitando.dhbw.distributed.Task;

import java.rmi.Remote;
import java.rmi.RemoteException;
import java.util.List;

public interface TaskService extends Remote {

    List<Task> getTasks() throws RemoteException;

}
