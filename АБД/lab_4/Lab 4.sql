------------------- Task 1 -------------------

select con_uid, name, open_mode from v$pdbs;

------------------- Task 2 -------------------

select instance_number, instance_name, host_name from v$instance;

------------------- Task 3 -------------------

select comp_id, comp_name, version, status from dba_registry;

------------------- Task 4 -------------------

-- Database Configuration Assistant

alter pluggable database PIAPDB open;

------------------- Task 5 -------------------

select * from v$pdbs;

------------------- Task 6 -------------------

-- Connections -> KVS PDB SYS, KVS PDB

create tablespace PIA_PDB_SYS_TS
  datafile 'PIA_PDB_SYS_TS.dbf' --change this if you need to
  size 10M
  autoextend on next 5M
  maxsize 50M;
  
create temporary tablespace PIA_PDB_SYS_TS_TEMP
  tempfile 'PIA_PDB_SYS_TS_TEMP.dbf'
  size 5M
  autoextend on next 2M
  maxsize 40M;

select * from dba_tablespaces where TABLESPACE_NAME like '%PIA%';


-- Role
create role PIA_PDB_SYS_RL;

grant connect, create session, create any table, drop any table, create any view, 
drop any view, create any procedure, drop any procedure to PIA_PDB_SYS_RL;

select * from dba_roles where ROLE like '%RL%';


-- Profile
create profile PIA_PDB_SYS_PROFILE limit
  password_life_time 365
  sessions_per_user 10
  failed_login_attempts 5
  password_lock_time 1
  password_reuse_time 10
  password_grace_time default


-- User
create user PIA_PDB_SYS_USER identified by 9900
  default tablespace PIA_PDB_SYS_TS 
  quota unlimited on PIA_PDB_SYS_TS
  temporary tablespace PIA_PDB_SYS_TS_TEMP
  profile PIA_PDB_SYS_PROFILE;

grant connect, create session, alter session, create any table, drop any table, create any view, 
drop any view, create any procedure, drop any procedure to PIA_PDB_SYS_USER; 
grant SYSDBA to PIA_PDB_SYS_USER;

select * from dba_users where USERNAME like '%PIA%';
------------------- Task 7 -------------------

-- Connections -> U1_KVS_PDB

create table PIA_PDB_SYS_ZAMAY
(
  TITLE varchar(50),
  ALBUM varchar(50), 
  RATE number
);

insert into PIA_PDB_SYS_ZAMAY values ('Aya', 'Lust Hero 3', 10);
insert into PIA_PDB_SYS_ZAMAY values ('Gibli', 'Andrey', 10);
insert into PIA_PDB_SYS_ZAMAY values ('On Sight', 'lust hero', 10);


select * from PIA_PDB_SYS_ZAMAY;

------------------- Task 8 -------------------

-- Connections -> PIA PDB SYS

select * from user_tablespaces;

select * from dba_data_files;
select * from dba_temp_files;

select * from dba_roles;
select * from dba_role_privs order by grantee;

select * from dba_profiles;
select * from dba_users;

select u.username, r.granted_role
  from dba_users u
  join dba_role_privs r on u.username = r.grantee;

------------------- Task 9 -------------------

-- Connections -> MAIN

create user c##PIA identified by 1488
account unlock;

grant create session to C##PIA;

-- Connections -> PIA PDB
grant create session to C##PIA;

------------------- Task 11 -------------------

-- Connections -> PIA PDB

select * from v$session where username is not null;

------------------- Task 12 -------------------

select * from dba_data_files;

------------------- Task 13 -------------------

-- Connections -> PIA PDB SYS

alter pluggable database PIAPDB close immediate;
drop pluggable database PIAPDB;


-- drop all
drop user c##PIA cascade;



