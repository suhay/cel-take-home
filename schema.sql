CREATE TABLE IF NOT EXISTS `events` (
  `id` INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
  `name` TEXT NOT NULL,
  `startTime` TIME NOT NULL,
  `duration` INTEGER NOT NULL,
  `daysOfWeek` TEXT NOT NULL
);

INSERT INTO `events` (`id`, `name`, `startTime`, `duration`, `daysOfWeek`) VALUES
(1,'First Event','22:00:00',60,'We'),
(2,'Second Event','07:36:00',100,'Mo,Fr');
