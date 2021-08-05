CREATE DATABASE IF NOT EXISTS datacenter;

USE datacenter;
CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL auto_increment,
  `email` varchar(255) COLLATE utf8_spanish_ci NOT NULL,
  `usuario` varchar(16) COLLATE utf8_spanish_ci NOT NULL COMMENT 'Username',
  `pass` varchar(32) COLLATE utf8_spanish_ci NOT NULL,
  `tipo` enum('administrador','consulta') COLLATE utf8_spanish_ci NOT NULL,
  `last_login_time` timestamp NULL DEFAULT NULL,
  `login_count` int(10) NOT NULL,
  `created_time` timestamp NULL DEFAULT NULL,
  `created_by` varchar(16) COLLATE utf8_spanish_ci DEFAULT NULL,
  `modified_time` timestamp NULL DEFAULT NULL,
  `modified_by` varchar(16) COLLATE utf8_spanish_ci DEFAULT NULL,
  `deleted` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

ALTER TABLE `usuarios`
  ADD UNIQUE KEY `email` (`email`);

INSERT INTO `usuarios` (`id`, `email`, `usuario`, `pass`, `tipo`, `last_login_time`, `login_count`, `created_time`, `created_by`, `modified_time`, `modified_by`, `deleted`) VALUES
(1, 'admin@admin.com', 'admin', '21232f297a57a5a743894a0e4a801fc3', 'administrador', NULL, 0, NULL, NULL, NULL, NULL, 0),
(2, 'consulta@consulta.com', 'consulta2', '5d76beffe761403531a6eb339e0f0231', 'consulta', NULL, 0, NULL, NULL, NULL, NULL, 0);

