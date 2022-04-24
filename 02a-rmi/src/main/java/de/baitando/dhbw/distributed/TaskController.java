package de.baitando.dhbw.distributed;

public class TaskController {

    private TaskService taskService;

    public void addTask(String title, String notes,
                        String due, String responsible) {
        taskService.createTask(
                new Task(title, notes, due, responsible)
        );
    }
}
