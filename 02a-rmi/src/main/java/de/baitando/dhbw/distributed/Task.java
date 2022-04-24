package de.baitando.dhbw.distributed;

import java.io.Serializable;

public class Task implements Serializable {

    private String title;
    private String notes;
    private String due;
    private String responsible;

    public Task(String title, String notes, String due, String responsible) {
        this.title = title;
        this.notes = notes;
        this.due = due;
        this.responsible = responsible;
    }

    @Override
    public String toString() {
        return "Task{" +
                "title='" + title + '\'' +
                ", notes='" + notes + '\'' +
                ", due='" + due + '\'' +
                ", responsible='" + responsible + '\'' +
                '}';
    }
}
