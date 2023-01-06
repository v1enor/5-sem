--1e ���������� 
create tablespace TS_PIA
    datafile 'TS_PIA.dfa'
    size 7m
    autoextend on next 5m
    maxsize 20m
    extent management local;
    

--2e ��������� �������
create TEMPORARY tablespace TS_PIA_TEMP
    TEMPFILE 'TS_PIA_TEMP.dfa'
    size 5m
    autoextend on next 3m
    maxsize 30m
    extent management local;
    

--3e ������ ���� ���� ����������� � ���� ������
-- ��� ��������� ������������
select TABLESPACE_NAME ��������, STATUS ������, CONTENTS ���, 
EXTENT_MANAGEMENT �����_����������, BLOCK_SIZE ������_������, NEXT_EXTENT ������_����������,
MAX_EXTENTS ����_���������, MAX_SIZE ����_������_�_������, BIGFILE ���_BIGFILE
from SYS.dba_tablespaces;

-- ������ ���� ������ dba
select FILE_NAME ����_�_�����, BYTES ������_�_������, MAXBYTES ����_������, 
INCREMENT_BY �����_���_����������, ONLINE_STATUS ������_������, STATUS ������
from SYS.dba_data_files;


--4e �������� ���� 
alter session set "_oracle_script"=true;
create role RL_PIACORE;

grant  connect, create session, create any table, drop any table, create any view, 
drop any view, create any procedure, drop any procedure to  RL_PIACORE;

--5e ������ �� ���� ���Ĩ�, �� �������!!!!!!!!1
select * from dba_roles where ROLE like '%RL%';

select * from dba_sys_privs where grantee = 'RL_PIACORE';


--6e �������� ������� ������������
create profile PF_PIACORE LIMIT
    PASSWORD_LIFE_TIME 180
    SESSIONS_PER_USER 3
    FAILED_LOGIN_ATTEMPTS 7
    PASSWORD_LOCK_TIME 1
    PASSWORD_REUSE_TIME 10
    PASSWORD_GRACE_TIME DEFAULT
    CONNECT_TIME 180
    IDLE_TIME 30
    
    
--7e ������ ��������, �������� ������� � ������ �������
select PROFILE, RESOURCE_NAME, LIMIT from dba_profiles order by PROFILE;

select * from dba_profiles where profile = 'PF_PIACORE'
select * from dba_profiles  where PROFILE = 'DEFAULT'


--8e �������� ������������ 
create user PIACORE identified by 12345
default tablespace TS_PIA quota unlimited on TS_PIA
temporary tablespace TS_PIA_TEMP
profile PF_PIACORE 
account unlock 
password expire


--10e �� ����� ���
grant connect, create session, create any table, drop any table, create any view, 
drop any view, create any procedure, drop any procedure to PIACORE;


create table PIACORE_ZAMAY_SONGS
(
  TITLE varchar(50),
  ALBUM varchar(50), 
  RATE number
);


insert into PIACORE_ZAMAY_SONGS values ('���������� ���', 'ANTIHUPETRAIN', 10);
insert into PIACORE_ZAMAY_SONGS values ('����-����-����', 'HYPE TRAIN', 10);
insert into PIACORE_ZAMAY_SONGS values ('������', 'Lust Hero', 10);

select * from PIACORE_ZAMAY_SONGS WHERE RATE = 10;

create view ALL_classic as 
select * from PIACORE_ZAMAY_SONGS WHERE RATE = 10;

select * form ALL_classic;


--11
create tablespace PIA_QDATA 
    datafile 'PIA_QDATA.dfa'
    size 10m
    offline;
    
    
    
select TABLESPACE_NAME, STATUS, CONTENTS from SYS.dba_tablespaces;

alter tablespace PIA_QDATA  ONLINE;

alter user PIACORE quota 2M on PIA_QDATA;


create table PIACORE_SLAVA_KPSS_SONGS
(
  TITLE varchar(50),
  ALBUM varchar(50), 
  RATE number
) tablespace PIA_QDATA;

drop table PIACORE_SLAVA_KPSS_SONGS;

insert into  PIACORE_SLAVA_KPSS_SONGS values ('RKN', 'RKN', 10);
insert into  PIACORE_SLAVA_KPSS_SONGS values ('EMINEM SHOW', 'EMINEM SHOW', 9);
insert into  PIACORE_SLAVA_KPSS_SONGS values ('�� �������', '������� �����', 8);

select * from PIACORE_SLAVA_KPSS_SONGS;
