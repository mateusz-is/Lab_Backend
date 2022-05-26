package com.example.demo;

import java.util.Map;

public class UsersPage {
    public int getPageNumber() {
        return pageNumber;
    }

    public int getPagesCount() {
        return pagesCount;
    }

    public int getPageSize() {
        return pageSize;
    }

    public int getTotalCount() {
        return totalCount;
    }

    public Map<Integer, UserEntity> getUsers() {
        return users;
    }

    private final int pageNumber;
    private final int pagesCount;
    private final int pageSize;
    private final int totalCount;
    private final Map<Integer, UserEntity> users;

    public UsersPage(int pageNumber, int pagesCount, int pageSize, int totalCount, Map<Integer, UserEntity> users) {
        this.pageNumber = pageNumber;
        this.pagesCount = pagesCount;
        this.pageSize = pageSize;
        this.totalCount = totalCount;
        this.users = users;
    }


}